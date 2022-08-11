import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BLIZZ_API_URL, BLIZZ_CONFIG } from '../Content/ApiConstants';
import { GuildContext } from '../Context/guildContext';

const GuildList = () => {
  const { guild } = useContext(GuildContext);
  const [membersWithImageLinks, setMembersWithImageLinks] = useState([]);

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

  const mapMemberImages = async () => {
    const resultArray = await Promise.all(guild.map(async (member) => getMemberImage(member)));
    setMembersWithImageLinks(resultArray);
  };

  useEffect(() => {
    if (!guild) { return; }
    else {
      mapMemberImages();
    }
  }, [guild]);

  return (
    <>
      <h1>
        Guild
      </h1>
      <ul>
        {membersWithImageLinks && membersWithImageLinks.map((member) => {
          const avatar = member?.images ? member.images[0].value : '';
          return (
            <li key={member.character.id}>
              <img alt={member.character.name} src={avatar} />
              {member.character.name}, {member.rank}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default GuildList;
