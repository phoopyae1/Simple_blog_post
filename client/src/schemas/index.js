import * as yup from "yup";
const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
const MAX_FILE_SIZE = 102400;

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}
export const basicSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required('Author is required'),
    image: yup
        .mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 100KB",
            value => value && value.size <= MAX_FILE_SIZE),
    content: yup.string().required('Content is required'),
})
