/**
 * Events View Toggle (Grid/List/Calendar)
 */
export function initEventsView() {
    const viewButtons = document.querySelectorAll('.events-view .view-btn');
    const eventsGrid = document.getElementById('events-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.dataset.view;
            eventsGrid.className = 'events-' + viewType;
        });
    });
}