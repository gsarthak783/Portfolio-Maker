import { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

// ✅ Corrected property keys for avataaars style
const avatarOptions = {
    top: ['shortHairShortFlat', 'shortHairDreads01', 'longHairCurly'],
    accessories: ['blank', 'sunglasses', 'round'],
    hairColor: ['black', 'brown', 'red'],
    facialHair: ['none', 'beardMedium', 'moustacheMagnum'],
    facialHairColor: ['black', 'brownDark'],
    clothes: ['blazerShirt', 'hoodie', 'graphicShirt'],
    clothingColor: ['pastelBlue', 'blue03', 'pastelRed'],
    eyes: ['default', 'wink', 'happy'],
    eyebrows: ['default', 'raisedExcited', 'upDown'],
    mouth: ['smile', 'twinkle'],
    skin: ['light', 'darkBrown', 'pale'],
  };
  
  
  const sampleConfig = {
    seed: 'professional',
    top: 'shortHairDreads01',
    accessories: 'sunglasses',
    hairColor: 'black',
    facialHair: 'moustacheMagnum',
    facialHairColor: 'black',
    clothes: 'hoodie',
    clothingColor: 'blue03',
    eyes: 'wink',
    eyebrows: 'raisedExcited',
    mouth: 'twinkle',
    skin: 'darkBrown',
  }
  
   

const AvatarPage = () => {
  const email = localStorage.getItem("email") || 'default-seed';

  const [config, setConfig] = useState(
    Object.fromEntries(Object.keys(avatarOptions).map(key => [key, avatarOptions[key][0]]))
  );

  const [avatarSvg, setAvatarSvg] = useState('');

  // ✅ Only use config and email as dependencies
  useEffect(() => {
    const svg = createAvatar(avataaars, {
      seed: email,
      ...config,
    }).toString();

    setAvatarSvg(svg);
  }, [config, email]);

  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Avatar config to save:', config);
    // Save logic goes here
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Customize Your Avatar</h1>

      <div
        className="w-40 h-40 rounded-lg bg-white shadow-lg flex items-center justify-center mb-8"
        dangerouslySetInnerHTML={{ __html: avatarSvg }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {Object.keys(avatarOptions).map(key => (
          <div key={key} className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text font-semibold capitalize">{key}</span>
            </label>
            <select
              className="select select-bordered"
              value={config[key]}
              onChange={e => handleChange(key, e.target.value)}
            >
              {avatarOptions[key].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-10 px-8" onClick={handleSave}>
        Save Avatar
      </button>
    </div>
  );
};

export default AvatarPage;
