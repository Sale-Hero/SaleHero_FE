import {Helmet} from "react-helmet-async";

interface Args{
    title: string;
}
export function ComponentHelmet({title}:Args) {
    return(
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}