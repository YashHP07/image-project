$(document).ready(function() {
    var imageCount = 1;

    // Function to ensure only one primary image is selected
    function updatePrimaryImageSelection() {
        var primarySelected = $('select[name="primary_image"]').filter(function() {
            return $(this).val() == "0";
        }).length > 0;
        
        // here we are simpally checking if there is no other selector present make the first image to primary image
        if (!primarySelected) {
            $('select[name="primary_image"]:first').val("0");
        }
        
        // this function is for handle the function if we make any image to primary image at that case our other image will set as secondary image 
        $('select[name="primary_image"]').each(function() {
            $(this).change(function() {
                if ($(this).val() == "0") {
                    $('select[name="primary_image"]').not(this).val("1");
                }
            });
        });
    }

    // Add image container
    $('.add-image').click(function() {
        imageCount++;
        var html = `
            <div class="image-container">
                <input type="file" name="property_image" accept="image/*">
                <select name="primary_image">
                    <option value="0">Primary Image</option>
                    <option value="1" selected>Secondary Image</option>
                </select>
                <a href="#" class="remove-image">Remove</a>
            </div>
        `;
        $('.property-images').append(html);
        updatePrimaryImageSelection();
    });

    // Remove image container
    $('.property-images').on('click', '.remove-image', function() {
        $(this).closest('.image-container').remove();
        updatePrimaryImageSelection();
    });

    // Update primary image selection when select element changes
    $('.property-images').on('change', 'select', function() {
        updatePrimaryImageSelection();
    });

    // Initial call to set primary image correctly on page load
    updatePrimaryImageSelection();
});
 