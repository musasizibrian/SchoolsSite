/**
 * Academic Programs Filter
 */
export function initProgramFilter() {
    const filterButtons = document.querySelectorAll('.program-filter .filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            programCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}