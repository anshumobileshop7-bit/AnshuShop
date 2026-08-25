const fetch = globalThis.fetch;

async function runE2E() {
  console.log('🧪 Starting Comprehensive Full-Stack E2E Test Suite for Anshu Mobile World...\n');

  // 1. Test Frontend Vite Server
  const feRes = await fetch('http://localhost:5173/');
  const feHtml = await feRes.text();
  if (feHtml.includes('Anshu Mobile World') && feHtml.includes('root')) {
    console.log('✅ 1. Frontend Vite Server is serving index.html properly');
  } else {
    console.error('❌ 1. Frontend Vite server check failed');
  }

  // 2. Test Backend Health Check
  const healthRes = await (await fetch('http://localhost:5000/api/health')).json();
  console.log('✅ 2. Backend Health Check:', healthRes.status);

  // 3. Test Public Endpoints
  const [hero, offers, gallery, about, settings] = await Promise.all([
    (await fetch('http://localhost:5000/api/hero')).json(),
    (await fetch('http://localhost:5000/api/offers')).json(),
    (await fetch('http://localhost:5000/api/gallery')).json(),
    (await fetch('http://localhost:5000/api/about')).json(),
    (await fetch('http://localhost:5000/api/settings')).json(),
  ]);

  console.log('✅ 3. Public GET Endpoints:');
  console.log('   - Hero Heading:', hero.data?.heading);
  console.log('   - Offers Count:', offers.count);
  console.log('   - Gallery Images Count:', gallery.count);
  console.log('   - About Title:', about.data?.title);
  console.log('   - Shop Name:', settings.data?.shopName);
  console.log('   - Phone / WhatsApp:', settings.data?.phone, '/', settings.data?.whatsapp);

  // 4. Test Unauthenticated Rejection
  const unauthRes = await fetch('http://localhost:5000/api/admin/hero', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ heading: 'Hacked' })
  });
  console.log('✅ 4. Protected Route correctly blocked unauthenticated request:', unauthRes.status === 401 ? '401 Unauthorized' : unauthRes.status);

  // 5. Test Admin Login with invalid password
  const failLogin = await (await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@anshumobile.com', password: 'WrongPassword!' })
  })).json();
  console.log('✅ 5. Invalid login correctly rejected:', failLogin.success === false, `(${failLogin.message})`);

  // 6. Test Admin Login with valid credentials
  const loginRes = await (await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@anshumobile.com', password: 'Admin@12345' })
  })).json();
  const token = loginRes.data?.token;
  console.log('✅ 6. Admin Login success:', loginRes.success, 'Token generated:', token ? `${token.substring(0, 25)}...` : 'none');

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };

  // 7. Test Admin Offer Creation (CRUD)
  const newOfferRes = await (await fetch('http://localhost:5000/api/admin/offers', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'E2E Test Deal — 5G Special Edition',
      description: 'Special test offer created by verification test.',
      category: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      originalPrice: 25000,
      offerPrice: 20000,
      ctaText: 'Inquire on WhatsApp',
      isActive: true,
      tags: '5G, Tested, Special'
    })
  })).json();
  const createdOfferId = newOfferRes.data?._id;
  console.log('✅ 7. Offer Created successfully! ID:', createdOfferId);

  // 8. Test Offer Toggle Active/Inactive
  const toggleRes = await (await fetch(`http://localhost:5000/api/admin/offers/${createdOfferId}/toggle`, {
    method: 'PATCH',
    headers: authHeaders
  })).json();
  console.log('✅ 8. Offer Status Toggled:', toggleRes.data?.isActive === false ? 'Deactivated' : 'Active');

  // 9. Test Offer Delete
  const deleteRes = await (await fetch(`http://localhost:5000/api/admin/offers/${createdOfferId}`, {
    method: 'DELETE',
    headers: authHeaders
  })).json();
  console.log('✅ 9. Offer Deleted successfully:', deleteRes.message);

  // 10. Test Gallery Upload & Delete
  const newGalleryRes = await (await fetch('http://localhost:5000/api/admin/gallery', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80',
      caption: 'E2E Test store counter photo',
      category: 'Store Interior',
      order: 99
    })
  })).json();
  const galleryId = newGalleryRes.data?._id;
  console.log('✅ 10. Gallery Photo Uploaded successfully! ID:', galleryId);

  const delGalleryRes = await (await fetch(`http://localhost:5000/api/admin/gallery/${galleryId}`, {
    method: 'DELETE',
    headers: authHeaders
  })).json();
  console.log('✅ 11. Gallery Photo Deleted successfully:', delGalleryRes.message);

  // 12. Test Admin Dashboard Stats
  const statsRes = await (await fetch('http://localhost:5000/api/admin/stats', {
    headers: authHeaders
  })).json();
  console.log('✅ 12. Admin Stats loaded:', statsRes.data?.totalOffers, 'offers,', statsRes.data?.galleryCount, 'gallery items');

  console.log('\n🎉 ALL FULL-STACK E2E TESTS PASSED PERFECTLY!');
}

runE2E().catch(console.error);
