import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BLIZZ_API_URL, BLIZZ_CONFIG } from '../Content/ApiConstants';

const GuildContext = createContext();

const GuildProvider = ({ children }) => {
  // Guild is the name of the "data" that gets stored in context
  const [guild, setGuild] = useState();

  const getGuild = () => {
    axios.get(`${BLIZZ_API_URL}/data/wow/guild/argent-dawn/sunnyglade-ratters/roster?${BLIZZ_CONFIG}`)
      .then((response) => {
        setGuild(response.data.members);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGuild();
  }, [setGuild]);

  return (
    <GuildContext.Provider value={{ guild }}>
      {children}
    </GuildContext.Provider>
  );
};

export { GuildContext, GuildProvider };

GuildProvider.propTypes = {
  children: PropTypes.node, // allows any renderable object
};