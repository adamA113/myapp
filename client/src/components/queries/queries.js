import { gql } from '@apollo/client';

const PINS = gql`
    query getPins {
        pins {
            title
            description
            imageId
            userId
            user {
                name
                id
            }
        }
    }
`

const AddPin = gql` 
    mutation AddPin($title: String!, $description: String!, $imageURL: String!, $userId: String!) {
        addPin(title: $title, description: $description, imageURL: $imageURL, userId: $userId) {
            title
            
        }
    }
`

const UserSignUp = gql`
    mutation UserSignUp($name: String!) {
        addUser(name: $name) {
            name
        }
    }
`

export { PINS, AddPin, UserSignUp };