import { useForm } from 'react-hook-form';

function App() {
	const { register, handleSubmit, getValues, watch } = useForm();

	watch();

	function submit(values) {
		console.log(values);
	}

	console.log(getValues());

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
				</div>
				<button className='btn btn-primary'>Sauvegarder</button>
			</form>
		</div>
	);
}

export default App;
