import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function App() {
	const yupSchema = yup.object({
		name: yup
			.string()
			.required('Le champ est requis')
			.min(2, 'Le champ doit contenir au moins deux caractères')
			.max(10),
		age: yup.number().typeError('Veuillez entrer un nombre').min(18),
	});

	const {
		register,
		handleSubmit,
		//getValues,
		//watch,
		formState: { errors },
	} = useForm({
		defaultValues: { name: '' },
		resolver: yupResolver(yupSchema),
		mode: 'onBlur',
	});

	// watch();

	function submit(values) {
		console.log(values);
	}

	return (
		<div
			className='d-flex flex-row justify-content align-items'
			style={{ backgroundColor: '#fefefe', height: '100vh', width: '100%' }}
		>
			<form onSubmit={handleSubmit(submit)}>
				<div className='d-flex flex-column mb-20'>
					<label htmlFor='name' className='mb-5'>
						Nom
					</label>
					<input {...register('name')} id='name' type='text' />
					{errors?.name && <p>{errors.name.message}</p>}
				</div>
				<div className='d-flex flex-column mb-20'>
					<label htmlFor='age' className='mb-5'>
						Age
					</label>
					<input {...register('age')} id='age' type='number' />
					{errors?.age && <p>{errors.age.message}</p>}
				</div>
				<button className='btn btn-primary'>Sauvegarder</button>
			</form>
		</div>
	);
}

export default App;
