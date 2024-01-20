import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const MyForm = () => {
    return (
      <Formik
        initialValues={{ fields: [{ name: '', value: '' }] }}
        onSubmit={values => {
          // Handle form submission here
          console.log(values);
        }}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="fields"
              render={arrayHelpers => (
                <div>
                  {values.fields.map((field, index) => (
                    <div key={index}>
                      <Field name={`fields.${index}.name`} placeholder="Field Name" />
                      <Field name={`fields.${index}.value`} placeholder="Field Value" />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove Field
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ name: '', value: '' })}
                  >
                    Add Field
                  </button>
                </div>
              )}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    );
  };
  
  export default MyForm;