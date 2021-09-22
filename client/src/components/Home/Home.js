import React from 'react';
import './Home.css';
import savedImg from './images/appsaved.jpg';
import searchImg from './images/appsearch.jpg'

const Home = () => {
    return (
        <div className='Home'>
            <div className='header'>
                <h1 className='brand'>NBA STATS,</h1>
                <h2>Not the only and not the best website for NBA stats!</h2>
            </div>
            <div className='about'>
                <div className='about-content'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quia pariatur dolore nisi laboriosam. Doloremque, autem quis eaque sint alias ducimus nam dolores saepe, cum repellendus fugit deserunt enim dicta! Modi sint, inventore accusamus ea fugit commodi accusantium culpa ullam qui tenetur perspiciatis nesciunt corporis atque vel delectus, eius quisquam?
                </div>
                <div className='about-image'>
                    <img src={searchImg}></img>
                </div>
                <div className='about-content'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quia pariatur dolore nisi laboriosam. Doloremque, autem quis eaque sint alias ducimus nam dolores saepe, cum repellendus fugit deserunt enim dicta! Modi sint, inventore accusamus ea fugit commodi accusantium culpa ullam qui tenetur perspiciatis nesciunt corporis atque vel delectus, eius quisquam?
                </div>
                <div className='about-image'>
                    <img src={savedImg}></img>
                </div>
                <div className='about-content'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quia pariatur dolore nisi laboriosam. Doloremque, autem quis eaque sint alias ducimus nam dolores saepe, cum repellendus fugit deserunt enim dicta! Modi sint, inventore accusamus ea fugit commodi accusantium culpa ullam qui tenetur perspiciatis nesciunt corporis atque vel delectus, eius quisquam?
                </div>
                <div className='about-image'>
                    <img src={savedImg}></img>
                </div>
            </div>
        </div>
    )
}

export default Home
