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
      fieldId: 'characterName-1',
      fieldName: 'characterName',
      label: 'Character name',
    },
    {
      type: 'input',
      fieldGroupId: '1',
      fieldId: 'realm-1',
      fieldName: 'realm',
      label: 'Realm (EU Only)',
      defaultValue: 'Argent Dawn',
    },
  ];
  const requestedRep = 'Argent Crusade';
  const [characterReps, setCharacterReps] = useState();

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

  const mapCharacterReps = async (characterList) => {
    const resultArray = await Promise.all(characterList.map(async (character) => getCharacterRep({ realm: character.realm, characterName: character.characterName })));
    setCharacterReps(resultArray);
  };

  const validateFormData = (data) => {
    console.log('d', data)
    
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    validateFormData(formData);
    // mapCharacterReps([formData]);
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
