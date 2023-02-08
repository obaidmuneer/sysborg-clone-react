import { useContext, useEffect } from 'react';
import FormikInput from '../formikInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useDoc from '../../hooks/useDoc';
import { GlobalContext } from '../../context/context';

import { BiSend } from 'react-icons/bi';

let validationSchema = yup.object().shape({
    classId: yup.string().required('Please enter a Class ID'),
});

const ClassId = () => {
    const { dispatch } = useContext(GlobalContext)
    const { getDoc } = useDoc()

    const formik = useFormik({
        initialValues: {
            classId: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            localStorage.setItem('classId', values.classId)
            getDoc()
            actions.setSubmitting(false)
        },
    });

    useEffect(() => {
        const id = localStorage.getItem('classId')

        if (!id) {
            dispatch({
                type: 'classId',
                payload: ''
            })
            return
        }
        formik.setFieldValue("classId", id)
        getDoc();
    }, [])

    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <FormikInput formik={formik} nameLabel={'classId'} placeHolder={'Enter Class ID'} icon={<BiSend />} />
            </form>
        </div>
    )
}

export default ClassId