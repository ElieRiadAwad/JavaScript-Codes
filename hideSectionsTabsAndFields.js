/**
 * Hides sections, tabs, and fields on the current form based on the provided names.
 * @param {Xrm.ExecutionContext} executionContext - The execution context of the form.
 * @param {...string} elements - Names of sections, tabs, or fields to hide.
 */
function hideSectionsTabsAndFields(executionContext, ...elements) {
    // Get the form context from the execution context
    var formContext = executionContext.getFormContext();

    // Set to store unique names of tabs, sections, and fields to hide
    var uniqueNames = new Set(elements);

    // Hide tabs and sections
    formContext.ui.tabs.forEach(function (tab) {
        if (uniqueNames.has(tab.getName())) {
            tab.setVisible(false);
            uniqueNames.delete(tab.getName()); // Remove the tab name from the set
        } else {
            tab.sections.forEach(function (section) {
                if (uniqueNames.has(section.getName())) {
                    section.setVisible(false);
                    uniqueNames.delete(section.getName()); // Remove the section name from the set
                }
            });
        }
    });

    // Hide fields
    formContext.data.entity.attributes.forEach(function (attribute) {
        if (uniqueNames.has(attribute.getName())) {
            attribute.controls.forEach(function (control) {
                control.setVisible(false);
            });
            uniqueNames.delete(attribute.getName()); // Remove the field name from the set
        }
    });

    // Log any invalid names remaining in the set
    if (uniqueNames.size > 0) {
        console.warn(`Warning: The following names provided to hideSectionsTabsAndFields() are invalid and do not correspond to existing tabs, sections, or fields on the form: ${Array.from(uniqueNames).join(', ')}`);
    }
}

// Example usage:
// hideSectionsTabsAndFields(executionContext, 'TabName1', 'SectionName1', 'FieldName1');
