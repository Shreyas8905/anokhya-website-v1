import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, Users, CheckCircle, XCircle, Loader, X } from 'lucide-react';

// Keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.9);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.5s ease-out;
  }
`;
document.head.appendChild(style);

// Event data
const eventData = {
  1: { name: "Photography", maxTeam: 1 },
  2: { name: "Free Fire", maxTeam: 4 },
  3: { name: "Shark Tank", maxTeam: 4 },
  4: { name: "BGMI", maxTeam: 4 },
  5: { name: "Treasure Hunt", maxTeam: 4 },
  6: { name: "Tech Debate", maxTeam: 2 },
  7: { name: "UI-UX", maxTeam: 2 },
  8: { name: "Meme-Splash", maxTeam: 2 }
};

const colleges = [
  "DSATM",
  "DSCE",
  "DSU"
];

const RegistrationForm = ({ eventId = 1 }) => {
  const event = eventData[eventId];
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([]);
  const [sameCollege, setSameCollege] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [otherCollege, setOtherCollege] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const initialMembers = Array.from({ length: event.maxTeam }, (_, i) => ({
      name: '',
      phone: '',
      email: i < 2 ? '' : null,
      college: '',
      otherCollege: ''
    }));
    setMembers(initialMembers);
  }, [event.maxTeam]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const validateForm = () => {
    if (!teamName.trim()) {
      setError('Team name is required');
      return false;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (!member.name.trim()) {
        setError(`Member ${i + 1} name is required`);
        return false;
      }
      if (!member.phone.trim() || !/^\d{10}$/.test(member.phone)) {
        setError(`Member ${i + 1} needs a valid 10-digit phone number`);
        return false;
      }
      if (i < 2 && (!member.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email))) {
        setError(`Member ${i + 1} needs a valid email`);
        return false;
      }
      
      const collegeValue = sameCollege ? selectedCollege : member.college;
      if (!collegeValue) {
        setError(`Member ${i + 1} college is required`);
        return false;
      }
      if (collegeValue === 'Others') {
        const otherValue = sameCollege ? otherCollege : member.otherCollege;
        if (!otherValue.trim()) {
          setError(`Member ${i + 1} needs to specify college name`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const registrationData = {
        event_name: event.name,
        team_name: teamName,
        members: members.map((m, i) => ({
          name: m.name,
          phone: m.phone,
          email: i < 2 ? m.email : null,
          college: sameCollege 
            ? (selectedCollege === 'Others' ? otherCollege : selectedCollege)
            : (m.college === 'Others' ? m.otherCollege : m.college)
        }))
      };

      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
        setTeamName('');
        setMembers(Array.from({ length: event.maxTeam }, (_, i) => ({
          name: '',
          phone: '',
          email: i < 2 ? '' : null,
          college: '',
          otherCollege: ''
        })));
        setSameCollege(false);
        setSelectedCollege('');
        setOtherCollege('');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 text-black font-bold rounded-xl 
                   hover:shadow-lg hover:shadow-orange-500/50 hover:-translate-y-0.5 
                   transition-all duration-300 active:scale-95"
      >
        Register Now
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85))',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Blurred background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 140, 0, 0.3) 0%, transparent 50%),
              repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255, 140, 0, 0.1) 40px, rgba(255, 140, 0, 0.1) 80px)
            `,
            filter: 'blur(60px)'
          }}></div>

          <div className="relative w-full max-w-3xl z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full 
                       flex items-center justify-center hover:bg-orange-500/20 transition-all duration-200 border border-orange-500/30"
            >
              <X className="w-5 h-5 text-orange-400" />
            </button>

            <div className="bg-black/60 backdrop-blur-xl border border-orange-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 max-h-[85vh] overflow-y-auto">
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="w-full relative flex justify-center">


  {/* Center Title */}
  <div className="text-center space-y-2">
    <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
      ANOKHYA 3.0
    </h2>

      {/* Left-side Event Name */}
  <p className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-semibold text-orange-400 tracking-wide">
    {event.name}
  </p>

    <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
  </div>
</div>


                {/* Team Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-orange-200 text-sm font-medium">
                    <Users className="w-4 h-4 text-orange-400" />
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-orange-500/30 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    placeholder="Enter your team name"
                  />
                </div>

                {/* Same College */}
                <label className="flex items-center gap-3 p-4 bg-black/40 backdrop-blur-md border border-orange-500/20 rounded-xl cursor-pointer hover:bg-black/50 hover:border-orange-500/40 transition-all">
                  <input
                    type="checkbox"
                    checked={sameCollege}
                    onChange={(e) => setSameCollege(e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: '#f97316' }}
                  />
                  <span className="text-orange-100 text-sm">
                    All members from same college
                  </span>
                </label>

                {sameCollege && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-orange-200 text-sm font-medium">
                      <Building2 className="w-4 h-4 text-orange-400" />
                      College Name
                    </label>
                    <select
                      value={selectedCollege}
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    >
                      <option value="" className="bg-black">Select College</option>
                      {colleges.map(college => (
                        <option key={college} value={college} className="bg-black">{college}</option>
                      ))}
                    </select>
                    {selectedCollege === 'Others' && (
                      <input
                        type="text"
                        value={otherCollege}
                        onChange={(e) => setOtherCollege(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-orange-500/30 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                        placeholder="Specify college name"
                      />
                    )}
                  </div>
                )}

                {/* Team Members */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-100 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-400" />
                    Team Members ({event.maxTeam})
                  </h3>

                  {members.map((member, index) => (
                    <div 
                      key={index}
                      className="p-5 bg-black/40 backdrop-blur-md border border-orange-500/20 rounded-xl space-y-3 hover:bg-black/50 hover:border-orange-500/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 
                                      flex items-center justify-center text-black text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-orange-200 text-sm font-medium">
                          Member {index + 1} {index === 0 && <span className="text-orange-400 text-xs">(Lead)</span>}
                        </span>
                      </div>

                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-md border border-orange-500/20 rounded-lg text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                        placeholder="Full Name"
                      />

                      <input
                        type="tel"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-md border border-orange-500/20 rounded-lg text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                        placeholder="Phone Number (10 digits)"
                      />

                      {index < 2 && (
                        <input
                          type="email"
                          value={member.email || ''}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-md border border-orange-500/20 rounded-lg text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                          placeholder="Email Address"
                        />
                      )}

                      {!sameCollege && (
                        <>
                          <select
                            value={member.college}
                            onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                            className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-md border border-orange-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                          >
                            <option value="" className="bg-black">Select College</option>
                            {colleges.map(college => (
                              <option key={college} value={college} className="bg-black">{college}</option>
                            ))}
                          </select>
                          {member.college === 'Others' && (
                            <input
                              type="text"
                              value={member.otherCollege}
                              onChange={(e) => handleMemberChange(index, 'otherCollege', e.target.value)}
                              className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-md border border-orange-500/20 rounded-lg text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                              placeholder="Specify college name"
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-xl">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || success}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 text-black font-bold rounded-xl
                           hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Registering...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Registered Successfully!
                    </>
                  ) : (
                    'Register for Event'
                  )}
                </button>
              </div>
            </div>

            {/* Success Overlay */}
            {success && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-2xl animate-fadeIn">
                <div className="bg-black/60 backdrop-blur-xl border border-orange-500/40 p-8 rounded-2xl text-center space-y-4 max-w-sm mx-4 shadow-2xl shadow-orange-500/30 animate-scaleIn">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 rounded-full 
                                flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-100">Success!</h3>
                  <p className="text-orange-300">Successfully Registered for {event.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Success Notification at Top */}
          {success && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] animate-slideDown">
              <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 text-black px-6 py-4 rounded-full shadow-2xl shadow-orange-500/50 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 animate-bounce" />
                <span className="font-bold text-lg">Successfully Registered!</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RegistrationForm;