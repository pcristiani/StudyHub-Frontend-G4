import { URL_BACK, PARAMETERS } from '../util/constants'

export const getCourseRelations = async () => {
    const url = URL_BACK.courseRelations;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PARAMETERS.accessToken} `,
    }

    let response = await fetch(url, {
        method: "GET",
        headers: headersList
    });

    let result = await response.text();
    // console.log(data);

    return result;
}
