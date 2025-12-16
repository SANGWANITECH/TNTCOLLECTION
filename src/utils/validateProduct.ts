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
        const numericPrice = parseFloat(formData.price.replace(/,/g, ""));
        if (isNaN(numericPrice) || numericPrice <= 0) {
            errors.price = "Price must be a valid number";
        }
    }

    if (!formData.selectedCategory) {
        errors.category = "Category is required";
    }

    if (!formData.selectedTargetGroup) {
        errors.targetGroup = "Target group is required";
    }

    if (!formData.imageUrl || !formData.imageUrl.trim()) {
        errors.imageUrl = "Product image is required";
    } else {
        const isBase64 = formData.imageUrl.startsWith("data:image/");
        const isFilename = /^[^\/]+\.(png|jpg|jpeg|webp)$/i.test(formData.imageUrl);

        if (!isBase64 && !isFilename) {
            errors.imageUrl = "Invalid image format";
        }
    }

    const isValid = Object.keys(errors).length === 0;

    return {
        isValid,
        errors,
        message: isValid ? "" : "All fields are required",
    };
};
