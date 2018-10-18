import React, { Component } from 'react';
import './SurveyCreator.css';

import SurveyQuestion from '../../component/SurveyQuestion/SurveyQuestion';
import SurveyDataSection from '../../component/SurveyDataSection/SurveyDataSection';

class SurveyCreator extends Component {
    state = {
        survey: {
            title: '',
            description: '',
            pointTotal: 0,
            questions: [
                {
                    title: '',
                    type: 'text',
                    answers: []
                },
            ],
        },
        formValidation: {
            title: {
                isValid: true,
                message: ''
            },
            description: {
                isValid: true,
                message: ''
            },
            pointTotal: {
                isValid: true,
                message: ''
            },
        },
        slideLocation: 0
    };

    handleSurveyScroll = (up = false) => {
        this.setState((prevState, props) => {
            let updatedSlideLocation = prevState.slideLocation;
            if (up)
                updatedSlideLocation--;
            else
                updatedSlideLocation++;
            return { slideLocation: updatedSlideLocation };
        });
    }

    handleAnswerChange = (questionIndex, answerIndex = null, value = null) => {
        let updatedSurvey = {...this.state.survey};
        let updatedQuestions = [...updatedSurvey.questions];
        let updatedQuestion = {...updatedQuestions[questionIndex]};
        let updatedQuestionAnswers = [...updatedQuestion.answers];

        if (answerIndex === null)
            updatedQuestionAnswers.push('');
        else if (value === null)
            updatedQuestionAnswers.splice(answerIndex, 1);   
        else 
            updatedQuestionAnswers[answerIndex] = value;

        updatedQuestion.answers = updatedQuestionAnswers;
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedSurvey.questions = updatedQuestions;

        this.setState({ survey: updatedSurvey });
    }

    handleQuestionChange = (questionIndex = null, dataType = null, value = null) => {
        let updatedSurvey = {...this.state.survey};
        let updatedQuestions = [...updatedSurvey.questions];

        if (questionIndex === null) {
            updatedQuestions.push({
                title: '',
                type: 'text',
                answers: []
            });
        } else if (dataType === null) {
            updatedQuestions.splice(questionIndex, 1);
        } else {
            let updatedQuestion = {...updatedQuestions[questionIndex]};
            updatedQuestion[dataType] = value;
            updatedQuestions[questionIndex] = updatedQuestion;
        }

        updatedSurvey.questions = updatedQuestions;
        
        this.setState({ survey: updatedSurvey });
    }

    handleBasicDataChange = (dataType, event) => {
        let value = event.target.value;

        let updatedFormValidation = {...this.state.formValidation};
        let updatedDataValidation = {...updatedFormValidation[dataType]};
        switch (dataType) {
            case 'title':
                if (value.length > 100)
                    updatedDataValidation.isValid = false;
                else 
                    updatedDataValidation.isValid = true;
                break;
            case 'description':
                if (value.length > 500)
                    updatedDataValidation.isValid = false;
                else 
                    updatedDataValidation.isValid = true;
                break;
            case 'pointTotal':
                if (parseInt(value) < 0 || isNaN(parseInt(value)))
                updatedDataValidation.isValid = false;
                else 
                    updatedDataValidation.isValid = true;
                break;
            default:
                break;
        }
        updatedFormValidation[dataType] = updatedDataValidation;

        const updatedSurvey = {...this.state.survey};
        updatedSurvey[dataType] = value;
        this.setState({ survey: updatedSurvey, formValidation: updatedFormValidation });
    }

    formIsValid = () => {
        let formValid = true;
        for (let field in this.state.formValidation) {
            formValid = formValid && this.state.formValidation[field].isValid;
        }

        return formValid;
    }

    handleSurveySubmit = (event) => {
        event.preventDefault();

        let formValid = this.formIsValid();

        if (!formValid) {
            console.log('FORM IS INVALID!!!');
        } else {
            console.log('Submitting the survey for review.');
            console.log(this.state.survey);
        }
    }

    render () {
        let surveyContentStyle = {
            transform: 'translateY(calc(-100vh*' + this.state.slideLocation + ')'
        };

        let questions = this.state.survey.questions.map((q, index, array) => {
            return (
                <SurveyDataSection
                            prevEnabled={true}
                            nextEnabled={true}
                            scrolled={this.handleSurveyScroll}>
                    <SurveyQuestion 
                        key={'question' + index} 
                        index={index} config={q} 
                        changed={this.handleQuestionChange}
                        answerChanged={this.handleAnswerChange}
                        enableAdd={index === array.length - 1}
                        scrolled={this.handleSurveyScroll} />
                </SurveyDataSection>
            );
        });

        return (
            <div className="SurveyCreator">
                <div className="SurveyContent" style={surveyContentStyle}>
                    <SurveyDataSection 
                        startEnabled={true}
                        scrolled={this.handleSurveyScroll}>
                        <h1>Survey Creator</h1>
                    </SurveyDataSection>
                    <form onSubmit={this.handleSurveySubmit}>
                        <SurveyDataSection
                            prevEnabled={true}
                            nextEnabled={true}
                            scrolled={this.handleSurveyScroll}>
                            <label>Survey Title</label>
                            <input type="text" placeholder="enter survey title here." value={this.state.survey.title} onChange={(event) => this.handleBasicDataChange('title', event)} />
                            <span className={this.state.formValidation.title.isValid ? "Message" : "Message Active"}>title is limited to 100 characters.</span>
                        </SurveyDataSection>
                        <SurveyDataSection
                            prevEnabled={true}
                            nextEnabled={true}
                            scrolled={this.handleSurveyScroll}>
                            <label>Description</label>
                            <textarea placeholder="enter survey description here." value={this.state.survey.description} onChange={(event) => this.handleBasicDataChange('description', event)} />
                            <span className={this.state.formValidation.description.isValid ? "Message" : "Message Active"}>description is limited to 500 characters.</span>
                        </SurveyDataSection>
                        <SurveyDataSection
                            prevEnabled={true}
                            nextEnabled={true}
                            scrolled={this.handleSurveyScroll}>
                            <label>Point Rewards</label>
                            <input placeholder="enter point rewards here." type="number" value={this.state.survey.pointTotal} onChange={(event) => this.handleBasicDataChange('pointTotal', event)} />
                            <span className={this.state.formValidation.pointTotal.isValid ? "Message" : "Message Active"}>point total should be a positive number.</span>
                        </SurveyDataSection>
                        {questions}
                        <SurveyDataSection
                            prevEnabled={true}
                            scrolled={this.handleSurveyScroll}>
                            <input type="submit" className="CreateButton" value="Create Survey!" />
                        </SurveyDataSection>
                    </form>
                </div>
            </div>
        );
    };
}

export default SurveyCreator;