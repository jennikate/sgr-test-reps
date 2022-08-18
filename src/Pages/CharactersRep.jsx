import { useState } from 'react';
import axios from 'axios';
import { BLIZZ_API_URL, BLIZZ_CONFIG } from '../Content/ApiConstants';
import DisplayForm from '../Components/DisplayForm';

// TO DO, make each realm/character into a field set so that they must go hand in hand data wise

const CharacterReputation = () => {
  const characterForm = [
    {
      type: 'input',
      fieldGroupId: '1',
      fieldId: 'characterName_1',
      fieldName: 'characterName',
      label: 'Character name',
    },
    {
      type: 'input',
      fieldGroupId: '1',
      fieldId: 'realm_1',
      fieldName: 'realm',
      label: 'Realm (EU Only)',
      defaultValue: 'Argent Dawn',
    },
    {
      type: 'input',
      fieldGroupId: '2',
      fieldId: 'characterName_2',
      fieldName: 'characterName',
      label: 'Character name',
    },
    {
      type: 'input',
      fieldGroupId: '2',
      fieldId: 'realm_2',
      fieldName: 'realm',
      label: 'Realm (EU Only)',
      defaultValue: 'Argent Dawn',
    },
  ];
  const characterFormValidationRules = [
    {
      field: 'characterName',
      type: 'required',
      message: 'Enter at least one character name',
    },
    {
      field: 'realm',
      type: 'required',
      message: 'Field is required',
    },
    {
      field: 'realm',
      type: 'minLength',
      message: 'Must be at least 3 characters',
      requirement: 3,
    },
  ];
  const requestedRep = 'Argent Crusade';
  const [characterReps, setCharacterReps] = useState();
  const [errors, setErrors] = useState([]);

  const getCharacterRep = async ({ realm, characterName }) => {
    const lowercaseCharacterName = characterName.toLowerCase();
    const lowercaseRealm = realm.replace(/\s+/g, '-').toLowerCase();
    try {
      const repList = await axios.get(`${BLIZZ_API_URL}/profile/wow/character/${lowercaseRealm}/${lowercaseCharacterName}/reputations?${BLIZZ_CONFIG}`);
      const specificRep = repList.data.reputations.filter((reputation) => {
        return reputation.faction.name === 'Argent Crusade';
      });
      return {
        character: repList.data.character,
        specificRep,
      };
    } catch (error) {
      return {
        error: 'error',
      };
    }
  };

  // BETTER HANDLE A 404 from the api call, right now code breaks

  const mapCharacterReps = async (characterList) => {
    const resultArray = await Promise.all(characterList.map(async (character) => getCharacterRep({ realm: character.realm, characterName: character.characterName })));
    setCharacterReps(resultArray);
  };

  const validateFormData = (data) => {
    // for each rule
    const results = characterFormValidationRules.map((rule) => {
      // get the formData value that matches that rules field
      const value = data[rule.field];
      // test if the value passes the validation rule
      switch (rule.type) {
        case 'required':
          if (!value || value.trim() === '') {
            return {
              error: true,
              message: rule.message,
              field: rule.field,
            };
          }
          break;
        case 'minLength':
          if (value && value.length < rule.requirement) {
            return {
              error: true,
              message: rule.message,
              field: rule.field,
            };
          }
          break;
        default:
      }
    });

    const resultsWithErrors = results.filter((result) => result?.error ? result : null);
    const errorsExist = resultsWithErrors.length > 0;
    setErrors({ ...errors, ...resultsWithErrors });
    return errorsExist;
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    // how to programatically create the below array so there can be infinite (or up to 10 at least) characters submitted
    const characterList = [
      { realm: formData.realm_1?.value, characterName: formData.characterName_1?.value },
      { realm: formData.realm_2?.value, characterName: formData.characterName_2?.value },
    ];
    const singleCharacter = { realm: formData.realm_1?.value, characterName: formData.characterName_1?.value };
    
    if(validateFormData(singleCharacter)) {
      // validate returns true ie there are errors
      console.log('display errors');
      // if you click submit twice, the second time it will have dropped all the values from the fields
      // so how do we store the values in the data until submit is finished
    } else {
      mapCharacterReps(characterList);
    }
  };

  return (
    <main className="main">
      <h1>Choose your reputation</h1>
      <p>Enter character(s)</p>
      <DisplayForm
        autocomplete={'off'}
        fields={characterForm}
        handleSubmit={handleSubmit}
      />

      <hr />
      {characterReps && <h2>Reps for {requestedRep}</h2>}
      {characterReps && characterReps.map((character) => {
        const repInfo = character.specificRep[0].standing;
        const repValue = repInfo.max === 0 ? 100 : repInfo.value;
        const repMax = repInfo.max === 0 ? 100 : repInfo.max;
        const repPercent = parseInt((repValue / repMax) * 100);
        return (
          <div className="block block--reputation" key={character.character.id}>
            <p className="body block__title">{character.character.name}</p>
            <p className="body body--small">{repInfo.name}</p>
            <progress className={repInfo.name.toLowerCase()} id="rep" max={repMax} value={repValue}>{repPercent}</progress>
          </div>

        );
      })}
    </main>
  );
};

export default CharacterReputation;
