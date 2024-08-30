import { useState, useEffect } from 'react';

const Monster = () => {
  const [monsterUrl, setMonsterUrl] = useState('');
  const [error, setError] = useState('');
  const [monsterData, setMonsterData] = useState(null);

  const fetchMonsterUrl = async (randomNum) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/monsters`);
      if (!response.ok) {
        throw new Error('Error fetching monster');
      }
      const data = await response.json();
      if (data.results && data.results[randomNum - 1]) {
        setMonsterUrl(data.results[randomNum - 1].url);
      } else {
        throw new Error('Monster URL not found');
      }
      setError('');
    } catch (error) {
      console.error('Virhe:', error);
      setError('Error fetching monsters');
    }
  };

  const fetchMonsterData = async () => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${monsterUrl}`);
      if (!response.ok) {
        throw new Error('Error fetching monster');
      }
      const data = await response.json();
      setMonsterData(data);
    } catch (error) {
      console.error('Virhe:', error);
      setError('Error fetching monster');
    }
  };

  useEffect(() => {
    if (monsterUrl) {
      fetchMonsterData();
    }
  },);

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 334) + 1;
    fetchMonsterUrl(randomNum);
  };

  return (
    <div>
      <h1>Get a random DND monster</h1>
      <button onClick={handleClick}>Click for a monster!</button>
      {error && <p>{error}</p>}
      {monsterData && (
        <div>
          <h2>{monsterData.name}</h2>
          <p>Str: {monsterData.strength}</p>
          <p>Dex: {monsterData.dexterity}</p>
          <p>Con: {monsterData.constitution}</p>
          <p>Int: {monsterData.intelligence}</p>
          <p>Wis: {monsterData.wisdom}</p>
          <p>Cha: {monsterData.charisma}</p>
          <p>Monster URL: {monsterUrl}</p>
        </div>
      )}
    </div>
  );
};

export default Monster;
