import { isDev } from './helpers'

const base_url = isDev() ? "https://terminator.berlin/api" : "/api";


export  function submitForm(email,
    phone_number,
    first_name,
    last_name,
    selected_authority_id,
    time) {
    return fetch(`${base_url}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            phone_number,
            first_name,
            last_name,
            authority_id: selected_authority_id,
            time
        }),
    })
        .then((response) => {
            if (response.ok) {
                console.log(response.ok)
                return response
            } else {
                throw new Error()
            }
        })
}


export function getLocations() {
    return fetch(`${base_url}/locations`, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (r) => {
        return await r.json();
    }).then(json => {
        return {
            locations: json,
            selected_authority_id: json[0].authority_id
        }
    })
}