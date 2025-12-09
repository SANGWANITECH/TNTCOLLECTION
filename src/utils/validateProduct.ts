// utils/validateProduct.ts
export interface ProductFormData {
    name: string;
    description: string;
    price: string;
    selectedCategory: string;
    selectedTargetGroup: string;
    imageUrl: string;
    availability?: boolean;
}

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
    message: string;
}

export const validateProductForm = (formData: ProductFormData): ValidationResult => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
        errors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
        errors.description = "Product description is required";
    }

    if (!formData.price.trim()) {
        errors.price = "Price is required";
    } else {
        const numericPrice = parseFloat(formData.price);
        if (isNaN(numericPrice)) {
            errors.price = "Price must be a valid number";
        } else if (numericPrice <= 0) {
            errors.price = "Price must be greater than 0";
        }
    }

    if (!formData.selectedCategory) {
        errors.category = "Category is required";
    }

    if (!formData.selectedTargetGroup) {
        errors.targetGroup = "Target group is required";
    }

    if (!formData.imageUrl.trim()) {
        errors.imageUrl = "Image URL is required";
    } else {
        try {
            new URL(formData.imageUrl);
        } catch {
            errors.imageUrl = "Please enter a valid image URL";
        }
    }

    const isValid = Object.keys(errors).length === 0;
    const message = isValid ? "" : "All field is required";

    return { isValid, errors, message };
};