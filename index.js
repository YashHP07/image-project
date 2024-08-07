$(document).ready(function() {
    var imageCount = 1;
    var imageUploaded = false; // Flag to track if an image has been uploaded

    function updatePrimaryImageSelection() {
        // Ensure only one image can be set as primary
        var primarySelected = $('select[name="primary_image"]').filter(function() {
            return $(this).val() == "0";
        }).length > 0;

        if (!primarySelected) {
            $('select[name="primary_image"]:first').val("0");
        }

        $('select[name="primary_image"]').each(function() {
            $(this).off('change').on('change', function() {
                if ($(this).val() == "0") {
                    $('select[name="primary_image"]').not(this).val("1");
                }
                updateRemoveButtonState(); // Update remove button state
            });
        });
    }

    function handleImagePreview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $(input).siblings('.preview').attr('src', e.target.result).show();
                imageUploaded = true; // Mark that an image has been uploaded
                updateAddButtonState(); // Update Add button state
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function updateAddButtonState() {
        // Enable or disable Add button based on imageUploaded flag
        $('.add-image button').prop('disabled', !imageUploaded);
    }

    function updateRemoveButtonState() {
        // Disable remove button for primary image
        $('.image-container').each(function() {
            var isPrimary = $(this).find('select[name="primary_image"]').val() == "0";
            $(this).find('.remove-image').prop('disabled', isPrimary);
        });
    }

    // Handle Add Image button click
    $('.add-image').click(function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        if (imageUploaded) {
            imageCount++;
            var html = `
                <div class="image-container">
                    <input type="file" name="property_image" accept="image/*">
                    <img class="preview" src="https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png" alt="Image preview">
                    <select name="primary_image">
                        <option value="0">Primary Image</option>
                        <option value="1" selected>Secondary Image</option>
                    </select>
                    <a href="#" class="remove-image">
                        <img src="https://img.icons8.com/?size=30&id=71200&format=png" alt="image-logo" height="20px">
                    </a>
                </div>
            `;
            $('.property-images').append(html);
            imageUploaded = false; // Reset image upload flag
            updatePrimaryImageSelection();
            updateAddButtonState(); // Update Add button state
            updateRemoveButtonState(); // Update remove button state
        } else {
            alert("Please upload an image before adding another one.");
        }
    });

    // Handle Remove Image button click
    $('.property-images').on('click', '.remove-image', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        if (!$(this).prop('disabled')) {
            $(this).closest('.image-container').remove();
            updatePrimaryImageSelection();
            updateAddButtonState(); // Update Add button state
            updateRemoveButtonState(); // Update remove button state
        }
    });

    // Handle file input change for image preview
    $('.property-images').on('change', 'input[type="file"]', function() {
        handleImagePreview(this);
    });

    // Handle primary image selection change
    $('.property-images').on('change', 'select[name="primary_image"]', function() {
        updatePrimaryImageSelection();
    });

    // Initialize primary image selection for existing images
    updatePrimaryImageSelection();
    updateAddButtonState(); // Initialize Add button state
    updateRemoveButtonState(); // Initialize remove button state
});
