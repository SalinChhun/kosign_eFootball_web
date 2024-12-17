export interface BaseResponse<T> {
    data: T
    status: Status
}

export interface Status {
    code:    number;
    message: string;
}

export interface Pagination {
    last:                   boolean;
    first:                  boolean;
    size:                   number;
    empty:                  boolean;
    total_pages:            number;
    current_page:           number;
    current_total_elements: number;
    total_elements:         number;
}

export interface User {
    "id": number,
    "first_name": string,
    "last_name": number,
    "email": number,
}

export interface UserResponse {
    users:  User[];
    pagination: Pagination;
}

export interface Product {
    "product_id": number,
    "product_name": string,
    "available_unit": number,
    "sale_price": number,
    "product_images": Image[],
    "model_name": number,
    "color_name": string
}

export interface ProductResponse {
    products:  Product[];
    pagination: Pagination;
}

export interface Image {
    id: number,
    image_url: string
}

export interface ModelResponse {
    id:  number;
    name: string;
}

export interface ColorResponse {
    id:  number;
    color_name: string;
}

export interface ProductImage {
    photo: string;
}

export interface CreateProductRequest {
    model_id: number;
    color_id: number;
    product_image: ProductImage[];
}