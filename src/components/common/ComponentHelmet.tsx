import {Helmet} from "react-helmet-async";

interface Args{
    title: string;
    description?: string;
}
export function ComponentHelmet({title, description}:Args) {
    return(
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
        </Helmet>
    )
}