/*
  Tanush Enterprises - Main JavaScript
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Quote Modal Logic (Tailwind version)
    const modal = document.getElementById('quoteModal');
    const modalContent = document.getElementById('modalContent');
    const openModalBtns = document.querySelectorAll('.trigger-quote');
    const closeModalBtn = document.getElementById('closeModal');
    
    function openModal() {
        if (!modal || !modalContent) return;
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
        
        modalContent.classList.remove('scale-95', 'translate-y-4');
        modalContent.classList.add('scale-100', 'translate-y-0');
        
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    function closeModal() {
        if (!modal || !modalContent) return;
        modal.classList.remove('opacity-100', 'visible');
        modal.classList.add('opacity-0', 'invisible');
        
        modalContent.classList.remove('scale-100', 'translate-y-0');
        modalContent.classList.add('scale-95', 'translate-y-4');
        
        document.body.style.overflow = '';
    }
  
    // Bind all trigger buttons
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });
  
    // Bind close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
  
    // Click outside modal content to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
  
    // Handling Form Submission visually (prevent page reload)
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending Request...';
            btn.classList.add('bg-green-600', 'text-white');
            
            // Simulate API call delay
            setTimeout(() => {
                btn.innerHTML = '✔️ Successfully Sent';
                setTimeout(() => {
                    closeModal();
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-600');
                }, 2000);
            }, 1000);
        });
    }

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if(mobileMenuBtn && mobileMenu && closeMobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }
});
