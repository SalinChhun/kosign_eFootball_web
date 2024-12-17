'use client'
import {Modal} from "react-bootstrap";
import React, {useState} from "react";
// import {useMutation, useQueryClient} from "@tanstack/react-query";
// import * as Yup from "yup";
// import {createCutomerSchema} from "@/app/validators/customer.schema";
// import {Controller, useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";
// import toast from "react-hot-toast";
// import {PatternFormat} from "react-number-format";
// import cn from "clsx";
// import TagsInput from "@/app/components/shared/TagsInput";
// import {ErrorMsgIcon} from "@/app/components/shared";
// import {DateUtils} from "@/utils/DateUtils";
import {useProductStore} from "@/app/lib/store/store";


const ProductModal = () => {
    const [showPopUpRestore, setShowPopUpRestore] = useState(false);
    const {open, setOpen, updateData, isUpdate} = useProductStore(state => state);
    console.log("---open", open)
    console.log("updateData", updateData)
    const checkKeyDown = (e: any) => {
        if (e.key === 'Enter') e.preventDefault();
    };


    return <>
        <Modal show={open}
               className={"modal"}
               dialogClassName={"modal-dialog modal-dialog-centered ks-wt-modal-lg-dialog"}
        >
            <form onKeyDown={checkKeyDown}>
                <div className="modal-content ks-wt-modal-content">
                    <div className="ks-wt-modal-header-container ks_d_inl_flex ks_jt_cont_betw ks_alg_itm_ctr">

                        <div>
                            <label>{isUpdate ? "Update Customer" : "Add New Customer"}</label>

                        </div>
                    </div>

                    <div className="ks-wt-modal-body ks_d_flex ks_flex_col">
                        <input
                            autoFocus
                            type="text"
                            value={updateData?.product_name}
                        />
                        <input
                            value={updateData?.product_name}
                        />
                    </div>


                    <div className="ks-wt-modal-footer ks_d_flex ks_jt_cont_end ks_alg_itm_ctr">
                            <div className="ks-wt-element-group-container ks_d_flex ks_alg_itm_ctr">
                                <button data-bs-dismiss="modal" className="ks_btn ks_btn_outl_sec" onClick={() => {
                                    setOpen(false)
                                    // reset();
                                    // setTaxId('')
                                }}>
                                    Cancel
                                </button>
                                <button className="ks_btn ks_btn_pm" type="submit">
                                    {isUpdate ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
            </form>
        </Modal>

    </>
}
export default ProductModal