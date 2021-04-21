import React, {useEffect} from 'react';
import faker from 'faker';
import CardItem from './CardItem';
import {useQuery, gql} from '@apollo/client';
import {LOAD_BOOKS} from '../graphql/queries';


function Cards() {

    const {error, loading, data} = useQuery(LOAD_BOOKS);

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className="cards">
            <h1>Check out our book sortiment!</h1>
            <div className="cards-divider"></div>
            <div className="cards-container">
                <div className="cards-items">
                <CardItem 
                    cover={faker.image.animals()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.business()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.fashion()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.nightlife()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.people()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.food()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.technics()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.transport()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.city()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.animals()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                    </div>
                    <div className="cards-items">
                <CardItem 
                    cover={faker.image.abstract()}
                    title={faker.name.title()}
                    author={faker.name.firstName() + " " + faker.name.lastName()}
                />
                </div>
            </div>
        </div>
    )
}

export default Cards
