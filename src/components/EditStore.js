import React from 'react';
import {withFormik, Field} from 'formik';
import * as Yup from 'yup';

const tags = ['Wifi', 'OpenLate', 'Family Friendly', 'Vegetarian', 'Licensed'];

const inputField = ({
	                    field, // { name, value, onChange, onBlur }
	                    form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	                    ...props
                    }) => (
	<div className='field'>
		<input type={props.type} {...field} {...props} id={props.id}
		       className={touched[field.name] && errors[field.name] && 'validation'}/>
		<label htmlFor={field.id}>{field.name}</label>
		{touched[field.name] &&
		errors[field.name] && <div className="error">
			<span className='error_tooltip'>
        {errors[field.name]}
      </span>
		</div>}
	</div>
);

const Form = ({values, errors, touched, isSubmitting, handleSubmit}) => {
	return (
		<form action="">
			<Field name="name"
			       type="name"
			       component={inputField}
			/>
			<Field name="destination"
			       component="textarea"
			       placeholder=''
			/>
			<ul>
				{tags.map(tag => (
					<Field
						id={tag}
						key={tag}
						name={tag}
						type="checkbox"
						component={inputField}
					/>
				))}
			</ul>
			<button type='submit' onClick={(e) => handleSubmit(e, values)} disabled={isSubmitting}>submit</button>
		</form>
	)
};
export const TestForm = withFormik({
	mapPropsToValues({name, destination, tags}) {
		return {
			name: name || '',
			destination: destination || '',
			tags: tags || '',
		}
	},
	handleSubmit: (values, {setSubmitting, resetForm}) => {
		fetch('http://localhost:7777/api/v1/add', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify(values)
		}).then(response => {
			console.log(response);
		}).catch(error => {
			console.log(error);
		});
		resetForm();
		setSubmitting(false);
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required('Field is required'),
	})
})(Form);

export default TestForm;