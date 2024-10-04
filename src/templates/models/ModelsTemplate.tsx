import { Link } from "react-router-dom"

const ModelsTemplate = ({ models }: any) => {
	return (
		<div>
			{models.length > 0 ? (
				<div className="flex justify-start flex-wrap gap-5 m-5 [&>*]:no-underline">
					{models.map((model: any, i: number) => (
						<Link to={`${model.id}/`} className="no-underline" key={i}>
							<div className="flex flex-col items-start gap-2.5  hover:scale-105 ease-in-out duration-200 w-48 h-48">
								<img
									src={model.image}
									alt={model.name}
									className="object-fit-cover w-full h-full"
									loading="lazy"
								/>
								<div className="w-full flex justify-center">
									<span className="text-gray-800 text-sm">
										{model.desc_name}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<span className="text-primary-text-color pl-10">No models found</span>
			)}
		</div>
	)
}
export default ModelsTemplate
