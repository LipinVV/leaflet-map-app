import {Link} from 'react-router-dom';

export const NoMatchPage = () => {

    return (
        <div>
            <h2>Sorry, there is no such page</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}