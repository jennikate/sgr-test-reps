import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  BLIZZ_API_URL,
  BLIZZ_CONFIG,
} from '../Content/ApiConstants';

const GuildContext = createContext();

// Blizzard provides a shadow image fallback for if you can't get a character image
// however if user has set their permissions to 'do not allow third party to get data'
// then you cannot get that users character profile, and therefore cannot determine
// the race & gender to call for the shadow image fallback
// Shadow image is useful if for some reason a character who you can call fails to provide an image
// to do this you need to call the character profile to get the gender, THEN call the image with race (from guild data) & gender (from profile data)
// But still need to cater to the characters who's data you cannot call
// So I'm using a generic shadow image for all situations (made with css)

const GuildProvider = ({ children }) => {
  const [errors, setErrors] = useState();
  const [guild, setGuild] = useState();
  const [guildMembers, setGuildMembers] = useState();

  const getMemberImage = async (member) => {
    const lowercaseCharacterName = member.character.name.toLowerCase();
    try {
      const imageList = await axios.get(`${BLIZZ_API_URL}/profile/wow/character/argent-dawn/${lowercaseCharacterName}/character-media?${BLIZZ_CONFIG}`);
      return {
        ...member,
        images: imageList.data.assets,
      };
    } catch (error) {
      return {
        ...member,
        image: [{ key: 'error', value: error.message }],
      };
    }
  };

  const mapMemberImages = async (memberList) => {
    const resultArray = await Promise.all(memberList.map(async (member) => getMemberImage(member)));
    setGuildMembers(resultArray);
  };

  const getGuild = () => {
    axios.get(`${BLIZZ_API_URL}/data/wow/guild/argent-dawn/sunnyglade-ratters/roster?${BLIZZ_CONFIG}`)
      .then((response) => {
        setGuild(response.data);
        mapMemberImages(response.data.members);
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  useEffect(() => {
    getGuild();
  }, [setGuild]);

  return (
    <GuildContext.Provider value={{ errors, guild, guildMembers }}>
      {children}
    </GuildContext.Provider>
  );
};

export { GuildContext, GuildProvider };

GuildProvider.propTypes = {
  children: PropTypes.node, // allows any renderable object
};
