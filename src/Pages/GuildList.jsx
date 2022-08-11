import { useContext } from 'react';
import { GuildContext } from '../Context/guildContext';

const GuildList = () => {
  const { guild } = useContext(GuildContext);

  return (
    <>
      <h1>
        Guild
      </h1>
      <ul>
        {guild && guild.map((member) => {
          return (
            <li key={member.character.id}>{member.character.name}, {member.rank}</li>
          );
        })}
      </ul>
    </>
  );
};

export default GuildList;
