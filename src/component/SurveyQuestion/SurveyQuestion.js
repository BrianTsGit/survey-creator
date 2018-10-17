import React from 'react';
import './SurveyQuestion.css';

/* PROPS
    index: number,
    config: {
        title: string,
        type: string,
        answers: [string]
    },
    changed: function,
    enableAdd: bool
*/

const surveyQuestion = (props) => {  
    let answers = null;
    let answerSection = null;

    if (props.config.type === 'checkbox' || props.config.type === 'radio') {
        if (props.config.answers && props.config.answers.length) {
            answers = props.config.answers.map((a, answerIndex) => {
                let answerChoiceClass = props.config.type === 'checkbox' ? 'AnswerChoice CheckBox' : 'AnswerChoice Radio';

                return (
                    <div key={answerIndex} className={answerChoiceClass}>
                        <input 
                            type="text" 
                            placeholder="enter option here." 
                            value={a} 
                            onChange={(event) => props.answerChanged(props.index, answerIndex, event.target.value)} />
                        <button onClick={() => props.answerChanged(props.index, answerIndex)}>X</button>
                    </div>
                );
            })
        }

        answerSection = (
            <div className="AnswerSection">
                <label className="QuestionLabel">Answer Choices</label> 
                <div className="AnswerChoices">
                    {answers}
                </div>
                <button className="AddAnswerButton" onClick={(event) => {
                    event.preventDefault();
                    props.answerChanged(props.index);
                }}>  
                    add option
                </button>
            </div>
        );
    }

    let addQuestionButton = !props.enableAdd ? 
        null :
        (<button className="QuestionActionButton AddQuestionButton" onClick={() => {
            props.changed();
            props.scrolled();
        }}>
            add question
        </button>);

    return (
        <div className="SurveyQuestion">
            <label className="QuestionLabel">
                Question {props.index + 1} 
                {props.index > 0 ? <span className="QuestionActionButton" onClick={() => { props.changed(props.index); props.scrolled(true); }}>X</span> : null}
            </label>
            <div className="QuestionSection">
                <input type="text" placeholder="enter question prompt here." value={props.config.title} onChange={(event) => props.changed(props.index, 'title', event.target.value)} />
            </div>
            {answerSection}
            <div className="QuestionSection">
                <label className="QuestionLabel">Question Type</label>
                <ul className="QuestionTypes">
                    <li>Text<input type="radio" checked={props.config.type === "text"} value="text" onChange={(event) => props.changed(props.index, "type", event.target.value)} /></li>
                    <li>Checkbox<input type="radio" checked={props.config.type === "checkbox"} value="checkbox" onChange={(event) => props.changed(props.index, "type", event.target.value)} /></li>
                    <li>Radio<input type="radio" checked={props.config.type === "radio"} value="radio" onChange={(event) => props.changed(props.index, "type", event.target.value)} /></li>
                </ul>
            </div>
            {addQuestionButton}
        </div>
    );
}

export default surveyQuestion;