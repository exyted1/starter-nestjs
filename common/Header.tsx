import { AccountConnect } from '@cardinal/namespaces-components'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { GlyphWallet } from 'assets/GlyphWallet';
import { useStakePoolId } from 'hooks/useStakePoolId';
import { useEnvironmentCtx } from 'providers/EnvironmentProvider';
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider';
import { useState } from 'react';

import { ButtonSmall } from './ButtonSmall';
import { asWallet } from './Wallets';

export const Header = () => {
  const { environment, secondaryConnection } = useEnvironmentCtx();
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { data: stakePoolId } = useStakePoolId();
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <div className={`mb-5 flex flex-wrap justify-center gap-6 px-10 pt-5 text-white md:justify-between`} style={{ color: stakePoolMetadata?.colors?.fontColor }}>
        {/* Logo for PC */}
        <div className="flex items-center gap-3 hidden md:flex">
          <a
            target="_blank"
            href={
              stakePoolMetadata?.websiteUrl ||
              `/${
                environment.label !== 'mainnet-beta'
                  ? `?cluster=${environment.label}`
                  : ''
              }`
            }
            className="flex cursor-pointer text-xl font-semibold"
            rel="noreferrer"
          >
            {stakePoolMetadata?.secondaryImageUrl && (
              <div className="ml-2 flex flex-row">
                <img
                  className="flex h-[35px] flex-col"
                  src={stakePoolMetadata?.secondaryImageUrl}
                  alt={stakePoolMetadata?.secondaryImageUrl}
                />
                {stakePoolMetadata.nameInHeader && (
                  <span
                    className="ml-5 mt-1 flex flex-col"
                    style={{ color: stakePoolMetadata?.colors?.fontColor }}
                  >
                    {stakePoolMetadata?.displayName}
                  </span>
                )}
              </div>
            )}
          </a>
        </div>
        {/* Navigation links */}
        <div className="relative my-auto flex flex-wrap items-center justify-center align-middle">
          <div className="mr-10 hidden md:flex flex-wrap items-center justify-center gap-8"> {/* Desktop Links */}
            <a href="https://minkspace.com" className="cursor-pointer">
              Home
            </a>
            <a href="https://mint.minkspace.com/" className="cursor-pointer">
              Minting
            </a>
            <a href="https://paper.minkspace.com" className="cursor-pointer">
              Litepaper
            </a>
          </div>
          {/* Menu icon for mobile */}
          <div className="block md:hidden">
            <button className="text-xs mr-8" onClick={toggleMobileMenu}>
              <MenuIcon />
            </button>
          </div>
          {/* Wallet connection */}
          <div className="hidden md:flex">
          {wallet.connected && wallet.publicKey ? (
              <AccountConnect
                dark={true}
                connection={secondaryConnection}
                environment={environment.label}
                handleDisconnect={() => wallet.disconnect()}
                wallet={asWallet(wallet)}
              />
            ) : (
              <ButtonSmall
                className="text-xs connect "
                onClick={() => walletModal.setVisible(true)}
              >
                <>
                  <GlyphWallet />
                  <div className="text-white">Connect wallet</div>
                </>
              </ButtonSmall>
            )}
          </div>
          {/* Mobile wallet connection */}
          <div className="md:hidden ml-10 ">
          {wallet.connected && wallet.publicKey ? (
              <AccountConnect
                dark={true}
                connection={secondaryConnection}
                environment={environment.label}
                handleDisconnect={() => wallet.disconnect()}
                wallet={asWallet(wallet)}
              />
            ) : (
              <ButtonSmall
                className="text-xs connect "
                onClick={() => walletModal.setVisible(true)}
              >
                <>
                  <GlyphWallet />
                  <div className="text-white">Connect wallet</div>
                </>
              </ButtonSmall>
            )}
          </div>
          {/* Image for mobile */}
          <div className="md:hidden">
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
            <div className="flex items-center justify-center min-h-screen">
              <div className="flex flex-col items-center">
                <button className="absolute top-4 right-4 text-white" onClick={closeMobileMenu}>
                  <CloseIcon />
                </button>
                <img
              className="h-[200px] w-[250px] "
              src="https://www.minkspace.com/images/logo/mink.png" // Replace with the URL of your mobile image
              alt="Mobile"
            />
                <ul className="focus">
                  <li className="focus2">
                    <a href="https://minkspace.com">
                      Home
                    </a>
                  </li>
                  <li className="focus2">
                    <a href="https://mint.minkspace.com/">
                      Mnting
                    </a>
                  </li>
                  <li className="focus2">
                    <a href="https://paper.minkspace.com">
                      Litepaper
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
