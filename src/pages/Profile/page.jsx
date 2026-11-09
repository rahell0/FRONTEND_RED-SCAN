
import ProfileHeader from './components/ProfileHeader';
import ProfileInformation from './components/ProfileInformation';
import ProfileActions from './components/ProfileActions';

export default function Profile({ user, setUser, shift, setPage, onOpenLogout }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <ProfileHeader user={user} shift={shift} />

      <div className="bg-white rounded-2xl p-7 border border-[#E6DFD5] flex flex-col gap-5 w-full shadow-xs">
        <ProfileActions
          setPage={setPage}
          onOpenLogout={onOpenLogout}
        />

        <ProfileInformation
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
}
