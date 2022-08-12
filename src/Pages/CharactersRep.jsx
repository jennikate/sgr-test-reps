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
      name: 'kayhlea',
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

  return (
    <>
      <h1>Rep</h1>
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
      <h2>Reps for {requestedRep}</h2>
      {characterReps && characterReps.map((character) => {
        return (
          <div key={character.character.id}>
            <p>{character.character.name}</p>
            <p>{character.specificRep[0].standing.name}</p>
          </div>

        );
      })}
    </>
  );
};

export default CharacterReputation;