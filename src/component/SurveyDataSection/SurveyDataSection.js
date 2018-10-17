import React from 'react';

import classes from './SurveyDataSection.css'

const surveyDataSection = (props) => {

    let startNav = null;
    let prevNav = null;
    let nextNav = null;

    if (props.startEnabled) {
        startNav = (
            <div className="SurveyNav SurveyStart" onClick={() => props.scrolled()}>
                <span>click here to start.</span>
            </div>
        );
    }

    if (props.prevEnabled) {
        prevNav = (
            <div className="SurveyNav SurveyUp" onClick={() => props.scrolled(true)}>
                <span>previous.</span>
            </div>
        );
    }

    if (props.nextEnabled) {
        nextNav = (
            <div className="SurveyNav SurveyDown" onClick={() => props.scrolled()}>    
                <span>next.</span>
            </div>
        );
    }

    return (
        <div className="SurveyDataSection">
            {props.children}
            {startNav}
            {prevNav}
            {nextNav}            
        </div>
    );
}

export default surveyDataSection;