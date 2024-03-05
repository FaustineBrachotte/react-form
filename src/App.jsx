import { useForm } from 'react-hook-form';

function App() {
	const {
		register,
		handleSubmit,
		//getValues,
		//watch,
		formState: { errors },
	} = useForm({
		defaultValues: { name: '' },
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
					<input
						{...register('name', {
							minLength: { value: 2, message: 'trop court' },
							required: { value: true, message: 'champ requis' },
							validate(value) {
								if (value == 'Jean') {
									return true;
								} else {
									return 'Mauvais prénom';
								}
							},
						})}
						id='name'
						type='text'
					/>
					{errors?.name && <p>{errors.name.message}</p>}
				</div>
				<div className='d-flex flex-column mb-20'>
					<label htmlFor='age' className='mb-5'>
						Age
					</label>
					<input
						{...register('age', { valueAsNumber: true })}
						id='age'
						type='number'
					/>
					{errors?.age && <p>{errors.age.message}</p>}
				</div>
				<button className='btn btn-primary'>Sauvegarder</button>
			</form>
		</div>
	);
}

export default App;
