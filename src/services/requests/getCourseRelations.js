import { URL_BACK } from '../util/constants'

export const getCourseRelations = async (jwtLogin) => {
    const url = URL_BACK.courseRelations;

    let headersList = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtLogin} `,
    }

    let response = await fetch(url, {
        method: "GET",
        headers: headersList
    });

    let result = await response.text();
    // console.log(data);
    return result;
}
