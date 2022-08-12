import { useState } from 'react';
import axios from 'axios';
import { BLIZZ_API_URL, BLIZZ_CONFIG } from '../Content/ApiConstants';

const CharacterReputation = () => {
  const requestedRep = 'Argent Crusade';
  const characterList = [
    {
      realm: 'argent-dawn',
      name: 'matteo',
    },
    {
      realm: 'argent-dawn',
      name: 'felamir',
    },
    {
      realm: 'argent-dawn',
      name: 'hood',
    },
    {
      realm: 'argent-dawn',
      name: 'rhaewon',
    },
  ];
  const [characterReps, setCharacterReps] = useState();

  const getCharacterRep = async ({ realm, characterName }) => {
    const lowercaseCharacterName = characterName.toLowerCase();
    try {
      const repList = await axios.get(`${BLIZZ_API_URL}/profile/wow/character/${realm}/${lowercaseCharacterName}/reputations?${BLIZZ_CONFIG}`);
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
    const resultArray = await Promise.all(characterList.map(async (character) => getCharacterRep({ realm: character.realm, characterName: character.name })));
    setCharacterReps(resultArray);
  };

  // Select realm
  // enter character name
  // add another (repeat)
  // select rep

  // take list
  // map to get reps
  // display just wanted rep

  // raw total rep score (regardless of tier -- I think is always 42000 total for normal reps)
  // value current rep score for tier
  // max total rep needed for tier

  return (
    <main className="main">
      <h1>Choose your reputation</h1>
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault;
          mapCharacterReps(characterList);
        }}
      >
        Go
      </button>
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
