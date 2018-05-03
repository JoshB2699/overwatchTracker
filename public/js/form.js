$('.no_checkboxes').multiselect({
    templates: {
        li: '<li><a href="javascript:void(0);"><label class="pl-2"></label></a></li>'
    },
    nonSelectedText: 'Choose...',
    selectedClass: 'bg-light',
    onInitialized: function(select, container) {
        // hide checkboxes
        container.find('input').addClass('d-none');
    }
});
