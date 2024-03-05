import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function App() {
	const yupSchema = yup.object({
		// name: yup
		// 	.string()
		// 	.required('Le champ est requis')
		// 	.min(2, 'Le champ doit contenir au moins deux caractères')
		// 	.test('isYes', "L'API a dit non", async () => {
		// 		const response = await fetch('https://yesno.wtf/api');
		// 		const result = await response.json();
		// 		console.log(result);
		// 		return result.answer === 'yes';
		// 	}),
		// age: yup
		// 	.number()
		// 	.typeError('Veuillez entrer un nombre')
		// 	.min(18, "L'âge doit être supérieur à 18 ans"),
		// password: yup
		// 	.string()
		// 	.required('Veuillez entrer un mot de passe')
		// 	.min(5, 'Le mot de passe est trop court')
		// 	.max(10, 'Le mot de passe est trop long'),
		// confirmPassword: yup
		// 	.string()
		// 	.required('Veuillez confirmer votre mot de passe')
		// 	.oneOf(
		// 		[yup.ref('password', '')],
		// 		'Les mots de passe doivent être identiques'
		// 	),
	});

	const defaultValues = {
		name: '',
		age: '',
		gender: '',
		password: '',
		confirmPassword: '',
		other: {
			astro: '',
			happy: false,
		},
	};

	const {
		register,
		handleSubmit,
		//getValues,
		//watch,
		//reset,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues,
		resolver: yupResolver(yupSchema),
		mode: 'onBlur',
	});

	// watch();

	async function submit(values) {
		try {
			clearErrors();
			const response = await fetch('https://restapi.fr/api/testr', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			if (response.ok) {
				throw new Error('new error');
				// const newUser = await response.json();
				// reset(defaultValues);
				// console.log(newUser);
			} else {
				console.log('Erreur');
			}
		} catch (e) {
			setError('globalError', { type: 'wrongName', message: e.message });
		}
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

				<div className='d-flex flex-column mb-20'>
					<label htmlFor='sexe' className='mb-5'>
						Sexe
					</label>
					<div>
						<label htmlFor='man'>Homme</label>
						<input
							{...register('gender')}
							id='man'
							value='man'
							type='radio'
						/>
					</div>
					<div>
						<label htmlFor='woman'>Femme</label>
						<input
							{...register('gender')}
							id='woman'
							value='woman'
							type='radio'
						/>
					</div>
				</div>

				<div className='d-flex flex-column mb-20'>
					<label htmlFor='happy' className='mb-5'>
						Content
						<input
							{...register('other.happy')}
							id='happy'
							type='checkbox'
						/>
					</label>
				</div>

				<div className='d-flex flex-column mb-20'>
					<label htmlFor='astro' className='mb-5'>
						Signe astrologique
					</label>
					<select {...register('other.astro')} id='astro'>
						<option value='' disabled>
							Sélectionnez votre signe
						</option>
						<option value='fish'>Poisson</option>
						<option value='aquarius'>Verseau</option>
						<option value='taurus'>Taureau</option>
						<option value='lion'>Lion</option>
					</select>
				</div>

				<div className='d-flex flex-column mb-20'>
					<label htmlFor='password' className='mb-5'>
						Mot de passe
					</label>
					<input {...register('password')} id='password' type='password' />
					{errors?.password && <p>{errors.password.message}</p>}
				</div>

				<div className='d-flex flex-column mb-20'>
					<label htmlFor='confirmPassword' className='mb-5'>
						Confirmation mot de passe
					</label>
					<input
						{...register('confirmPassword')}
						id='confirmPassword'
						type='password'
					/>
					{errors?.confirmPassword && (
						<p>{errors.confirmPassword.message}</p>
					)}
				</div>
				{errors.globalError && <p>{errors.globalError.message}</p>}
				<button disabled={isSubmitting} className='btn btn-primary'>
					Sauvegarder
				</button>
			</form>
		</div>
	);
}

export default App;
