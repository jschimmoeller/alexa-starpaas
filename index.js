const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Alexa Star Pass, what do you want me to do!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('StarPaaS', speechText)
      .getResponse();
  }
};

const GetItIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetIt';
  },
  handle(handlerInput) {
    console.log(` get it intent ${JSON.stringify(handlerInput)}`);
    const searchOption = handlerInput.requestEnvelope.request.intent.slots.searchoption.value;
    const speechText = `OK we will find you some ${searchOption}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('StarPaaS', speechText)
      .getResponse();
  }
};

const SearchPeriodIntentHandler = {
  canHandle(handlerInput) {
    console.log(` search period intent ${JSON.stringify(handlerInput)}`);
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SearchPeriod';
  },
  handle(handlerInput) {
    console.log(` search period intent ${JSON.stringify(handlerInput)}`);
    const searchOption = handlerInput.requestEnvelope.request.intent.slots.searchevent.value;
    const thePeriod = handlerInput.requestEnvelope.request.intent.slots.period.value;
    const speechText = `OK looking for ${searchOption} in this ${thePeriod} `;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('StarPaaS', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask me to lookup specific customer data or get specific information; just ask';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('StarPaaS', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'See you later';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('StarPaaS', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const speechText = 'Sorry, I can\'t understand the command. Please say again.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FallbackIntent';
  },
  handle(handlerInput) {
   console.log(` fallback intent ${JSON.stringify(handlerInput)}`);
   return handlerInput.responseBuilder
      .speak('FALLBACK')
      .reprompt('FALLBACK')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetItIntentHandler,
    SearchPeriodIntentHandler,
    FallbackHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
