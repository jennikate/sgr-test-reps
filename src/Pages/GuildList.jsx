import { useContext } from 'react';
import { GuildContext } from '../Context/guildContext';

const GuildList = () => {
  const { errors, guildMembers } = useContext(GuildContext);

  // inset w230 x h116

  return (
    <main className="main">
      <h1>
        Guild
      </h1>
      {errors && <p>There was a problem loading the data, refresh and try again.</p>}
      <ul className="flex-wrapper">
        {guildMembers && guildMembers.map((member) => {
          // const avatar = member?.images ? member.images[0].value : '';
          const inset = member?.images ? member.images[1].value : '';
          return (
            <li key={member.character.id}>
              <img alt={member.character.name} src={inset} />
              {member.character.name}, {member.rank}
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default GuildList;
