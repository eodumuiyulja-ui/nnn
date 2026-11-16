/* ORBIS COMPLETE — navigation shared by Stages 1–4 */
const navItems = [...document.querySelectorAll('.nav-item')];
const pages = [...document.querySelectorAll('.page')];
const crumb = document.getElementById('crumb') || document.getElementById('breadcrumbCurrent');
const sidebar = document.getElementById('sidebar');
const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobileMenuButton');

function showPage(name, updateHash = true) {
  const page = document.getElementById(`page-${name}`);
  if (!page) return;
  pages.forEach(item => item.classList.toggle('active', item === page));
  navItems.forEach(item => item.classList.toggle('active', item.dataset.page === name));
  if (crumb) crumb.textContent = name.replace(/-/g, ' ').toUpperCase();
  if (sidebar) sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (updateHash) history.replaceState(null, '', `#${name}`);
}

navItems.forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));
document.querySelectorAll('[data-link]').forEach(item => item.addEventListener('click', () => showPage(item.dataset.link)));
/* Keep compatibility with the original Stage 1 in-page link convention. */
document.querySelectorAll('[data-page-link]').forEach(item => item.addEventListener('click', () => showPage(item.dataset.pageLink)));
if (mobileMenu && sidebar) mobileMenu.addEventListener('click', () => sidebar.classList.toggle('open'));

/* Restore a selected page when a user reloads a deep link. */
const initialPage = location.hash.slice(1);
if (initialPage) showPage(initialPage, false);
window.addEventListener('hashchange', () => {
  const name = location.hash.slice(1);
  if (name) showPage(name, false);
});
