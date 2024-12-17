import {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import {useQueryClient} from "@tanstack/react-query";
import useFetchModel from "@/app/lib/hooks/useFetchModel";
import useFetchColor from "@/app/lib/hooks/useFetchColor";
import {useProductMutation} from "@/app/lib/hooks/useProductMutation";
import {CreateProductRequest} from "@/app/lib/types/common";

const CreateProduct = () => {


    const queryClient = useQueryClient()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const createProductMutation = useProductMutation.useCreateProduct();
    const {model_list} = useFetchModel();
    const {color_list} = useFetchColor();
    const [model, setModel] = useState(model_list.length > 0 ? model_list[0]?.id : 0);
    const [color, setColor] = useState(color_list.length > 0 ? color_list[0]?.id : 0);

    useEffect(() => {
        if (model_list?.length > 0) {
            setModel(model_list[0]?.id);
        }
        if (color_list?.length > 0) {
            setColor(color_list[0]?.id);
        }
    }, [model_list, color_list]);

    // console.log("model", model);
    // console.log("color", color);


    const handleSubmit = () => {
        const request: CreateProductRequest = {
            model_id: model,
            color_id: color,
            product_image: []

        }
        createProductMutation.mutation(request);
        handleClose();
    }


    return (
        <>

            <div className="mt-2">
                <Button variant="primary" onClick={handleShow}>
                    Create New Product
                </Button>
                <Modal show={show} onHide={handleShow} centered>
                    <Modal.Header>
                        <Modal.Title>
                            Create Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">
                                    Select Model Name
                                </label>
                                <select name="categoryId" className="form-select" aria-label="Default select example"
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            if (!isNaN(value)) {
                                                setModel(value);
                                            }
                                        }}
                                >
                                    {model_list?.map((model: any) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <option value={model?.id}>{model?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Select color Name
                                </label>
                                <select name="categoryId" className="form-select" aria-label="Default select example"
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            if (!isNaN(value)) {
                                                setColor(value);
                                            }
                                        }}
                                >
                                    {color_list?.map((color: any) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <option value={color?.id}>{color?.color_name}</option>
                                    ))}
                                </select>
                            </div>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )


}

export default CreateProduct;