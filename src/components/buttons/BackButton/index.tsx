import { ArrowLeft } from "../../../assets/svgs/Icons";

interface Props {
	navigate: any
}

export function BackBtn(props: Props) {

	const handleOnClick = () => {
		props.navigate(-1);
	}

	return (
		<button
			className="m-2 flex items-center justify-center space-x-1 text-lg font-semibold"
			type="button"
			onClick={handleOnClick}

		>
			<div>
				<ArrowLeft size={20} />
			</div>
			<div>
				Back
			</div>
		</button>
	)
}