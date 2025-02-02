import React from "react";
import Banner from "../_components/Banner";

type Props = {};

const TermsAndConditionsPage = (props: Props) => {
  return (
    <div>
      <Banner label="Terms & Conditions" />

      <div className="mt-12">
        <div className="max-w-5xl mx-auto p-6 space-y-6 text-gray-800">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Terms & Conditions
          </h1>

          {/* Pickup & Return Instructions */}
          <section>
            <p className="font-semibold">
              Car rental vehicle pick up and return instructions are as follow.
            </p>
            <p className="font-bold">CUSTOMER PICK UP / RETURN —</p>
            <p>
              Complimentary customer pickup - Airport terminal gates, Near by
              hotels, Lax Green-line Metro station. Please contact the rental
              location directly if you are in need of these services.
            </p>
            <p>
              Contact # <span className="font-bold">(310)294-6980</span>
            </p>

            <p className="font-bold mt-4">AFTER-HOURS DROP —</p>
            <p>
              Eagle Car Rental is a 24-hour operation company. Locations are
              open 7-days a week. If you need to RETURN a vehicle, please advise
              a representative of your return and ask about specific return
              instructions.
            </p>

            <p className="font-bold mt-4">Lax office location is located —</p>
            <p>(1009 W Arbor Vitae St. Inglewood, CA, 90301)</p>
          </section>

          {/* One-Way Returns */}
          <section>
            <p className="font-bold">ONE-WAY RETURNS —</p>
            <p>
              Vehicles rented from one of our LA locations that return to Las
              Vegas, will automatically be charged a drop fee of $750; same fee
              applies if rented in Las Vegas, and returns in Los Angeles.
              Vehicles not returned to the original rental location will be
              charged a “drop fee.
            </p>
          </section>

          {/* Payment Policy */}
          <section>
            <p className="font-bold">
              CREDIT CARD & Debit Card- (POLICY) ACCEPTABLE FORMS OF PAYMENT.
            </p>

            <p className="text-red-600 font-bold mt-4">
              ** IMPORTANT TO READ **
            </p>
            <p>
              For rental charge authorizations or deposits. Credit cards & Debit
              card MUST be valid and must match the renters Driver’s License.
              The authorization amount (rental deposit) is separate from the
              payment (rental charges). At the time of rental, the authorization
              (deposit) and separate payment for entire rental will be made on
              renters’ credit card or debit card. Customer will see two
              transaction on their statement.
            </p>

            <p>
              We can accept debit card for rental vehicle in person and as final
              payment ONLY. Only the renter of a vehicle can make this payment.
              Again…. Rental deposit authorization must be made on a major
              credit card or debit card at beginning of rental. We do take CASH
              DEPOSITS ALLOWED ON ANY VEHICLE – MUST HAVE VALID insurance full
              coverage for that to be amplified.
            </p>

            <p>
              The authorization, or portion thereof, may be used for any
              additional charges accumulated during the rental contract period
              beyond what was already taken for payment at the beginning of the
              rental. Authorization amount depend on the type of vehicle and is
              separate from the rental charges.
            </p>
            <p>
              A minimum $500 credit card & debit card authorization is required
              at the beginning of the rental on all standard vehicles, Compact
              to Full Size Cars
            </p>
            <p>
              The SUV’s, Premium, Luxury and Higher vehicles and have higher
              authorization depending on the value of the vehicle and length of
              rental. Credit card& debit card authorizations are valid for 30
              days, and may be used for unpaid rental charges and incidentals
              such as gas, tickets, or tolls. Upon the release of the
              authorizations, depending on the issuing bank, it may take 3-10
              business days for the bank to return the authorization. Internal
              credit card or debit card may have additional fees or longer wait
              time for authorizations to be refunded. THIRD PARTY BILLING is
              only permitted when setting up insurance billing, or a corporate
              account with the completion of our credit card charge form,
              approved by management. Paying parties must give written consent
              along with accompanying requested documents (copy of the credit
              card & Debit card associated driver’s license) pending final
              approval from Eagle car rental Management.
            </p>
          </section>

          {/* Drivers License & Insurance */}
          <section>
            <p className="font-bold">DRIVERS LICENSE, INSURANCE, & COVERAGES</p>

            <p className="font-bold mt-4">DRIVERS LICENSE POLICY —</p>
            <p>
              All renter and additional drivers must have a valid government
              driver’s license in their possession to rent a vehicle. Under no
              circumstance are photocopies, faxed licenses, or images on mobile
              device considered valid. The original government issued license
              MUST be presented, and must be in the name of the driver. The
              renter’s driver’s license must be valid for the entire rental
              period, with the following exception: An expired U.S. State
              driver’s license of U.S. military personnel on active duty is
              accepted at this location. The renter must present proof that
              he/she is on active duty. Expired licenses of U.S. military
              personnel returning from overseas duty are accepted for up to 60
              days after discharge. An International Driving Permit (IDP) serves
              only as a translation of a valid driver’s license. An IDP must
              always be presented in conjunction with the official drivers
              license of the issuing country along with a current passport.
              Eagle Car Rental will NOT rent to a holder of a license that
              restricts them to daytime driving only or to business driving
              only. Expired licenses will NOT be accepted. A learner’s permit is
              NOT accepted. A valid temporary license is accepted only with
              original copy from Department of Motor Vehicles.
            </p>

            <p className="font-bold mt-4">PROOF OF INSURANCE —</p>
            <p>
              We ask that you provide us with your insurance details (Proof of
              Insurance AND an Insurance Declaration Page) at the time of
              booking this helps expedite your time at the rental office so
              we’re not verifying your coverage while you wait. Alternatively, a
              conference-call phone verification may be requested with rental
              counter agent and insurance company, followed up with a
              Declaration Page from the Insurance Company. For any questions or
              concerns regarding coverage requirements please email.
            </p>
            <a
              href="mailto:eaglecarrental3@gmail.com"
              className="text-blue-600"
            >
              eaglecarrental3@gmail.com
            </a>
          </section>

          {/* Insurance & Coverage */}
          <section>
            <p className="font-bold">ADDITIONAL VEHICLE COVERAGES</p>

            <p className="font-bold mt-4">COLLISION DAMAGE WAIVER (CDW) —</p>
            <p>
              In California, the renter is liable for all damage to the rented
              vehicle regardless of fault. The renter is also liable for loss of
              use of the vehicle (revenue lost while the car is being repaired).
              Renters may purchase Collision Damage Waiver (CDW) which relieves
              them of all financial responsibility for loss or damage to the
              Rental vehicle as long as they comply with the terms of the rental
              agreement. In California, CDW does NOT relieve the renter for
              theft resulting from failure to use ordinary care. Cost of CDW
              will vary by car, group and rate. If you have rental car coverage
              through your personal insurance or charge card it may contain a
              deductible. Written proof of insurance, or phone verification is
              required. If you have any questions, check with your insurance
              provider.
            </p>

            <p className="font-bold mt-4">
              RENTAL LIABILITY PROTECTION (RLP) —
            </p>
            <p>
              Qualified renters may purchase Renters Liability Protection (RLP)
              at the time of rental. Renters in California who purchase RLP will
              receive California required liability coverage. And las Vegas
              required liability coverage.
            </p>
            <p>
              IF YOU WILL BE DECLINING OUR COVERAGES, WRITTEN PROOF OF LIABILITY
              COVERAGE IS REQUIRED AT TIME OF RENTAL. Alternatively, conference
              call phone verification may be requested with rental counter agent
              and insurance company, followed up with a Declaration Page from
              the Insurance Company.
            </p>
            <p className="font-bold mt-4">ACCIDENT LIABILITY PROTECTION</p>
            <p>
              Liability coverage is required in the State of California & Nevada
              You must either provide written proof of coverage or purchase.
              Liability coverage does not cover your rental car, it covers any
              damage that your vehicle would cause to any 3rd party property.
              Liability coverage provides third party liability protection for
              bodily injury ($15,000 per person, $30,000 per accident) and
              property damage ($5,000) to third parties, as mandated and at the
              limits required by California. Nevada required limits $25,000 per
              person for bodily injury; $50,000 for bodily injury; $20,000 for
              property damage.
            </p>
          </section>

          {/* Other Policies */}
          <section>
            <p className="font-bold">OTHER POLICIES</p>

            <p className="font-bold mt-4">CONTRACT RATES —</p>
            <p>
              If your vehicle is needed beyond the due date stated at the time
              of the opening the rental contract, the customer MUST return to
              the rental office and sign a new contract. The rate is subject to
              change beyond the contract rate. When a vehicle is reserved and
              rented, the confirmed rate is only good during that specific time
              period on the rental contract. Any extension, or revision of the
              original reservation of any amount of time may result in a Rate
              change. Rates are not pro-rated and based on market and
              availability.
            </p>

            <p className="font-bold mt-4">VEHICLES LEAVING CALIFORNIA —</p>
            <p>
              Vehicles leaving the state of California may be subject to mileage
              fees, please check what your mileage restrictions are with our
              booking agent. Eagle Car Rental does not offer roadside service
              outside of California and Nevada. For any questions or concerns
              regarding our policies please Email{" "}
              <a
                href="mailto:eaglecarrental3@gmail.com"
                className="text-blue-600"
              >
                eaglecarrental3@gmail.com
              </a>
            </p>

            <p className="font-bold mt-4">DRIVING AREA —</p>
            <p>
              Vehicles are strictly PROHIBITED for entry into MEXICO or CANADA.
            </p>
            <p className="font-bold">OTHER POLICIES</p>

            <p className="font-bold mt-4">ADDITONAL DRIVERS _</p>
            <p>
              Up to one additional drivers is permitted on the rental contract
              at no extra charge if over 25 years of age. Underage drivers will
              have a $25/day fee added per driver. Additional drivers MUST be
              preset at time of rental pick up and present valid drivers
              license. Legal spouse of renter on contract is allowed to be an
              additional driver if not present at time of rental pick up; must
              have same place of residence. Minimum Age for Additional Drivers
              is 21.
            </p>
            <p className="font-bold mt-4">UNDER-AGE POLICY _</p>
            <p>
              Renters must be a minimum of 21 years of age. You may qualify if
              you are between 18 and 20 with proof of full coverage transferable
              insurance. If you are under 21 you MUST provide us with a copy of
              your insurance (Declaration Page) so we may verify policy before
              renting. Customer may not purchase any additional coverages; MUST
              HAVE THEIR OWN FULL COVERAGE THAT TRANSFERS TO A RENTED VEHICLE.
              IF driver under that age of 21, Underage Driver fee is $25/day.
              Please contact our reservation center for more information
            </p>
            <p className="font-bold mt-4">FUEL POLICY _</p>
            <p>
              Vehicle must be returned with same amount of fuel when vehicle was
              checked out. A re-fuel charge based per gallon will be charged at
              the end of the rental if returned with less fuel than received. If
              the vehicle that you reserved is not available, an alternate or
              upgraded vehicle may be assigned at management discretion.
              Customers are welcome to request a preference of make, model, or
              color but it is NOT a guarantee of that request.
            </p>
          </section>

          {/* Additional Add-ons */}
          <section>
            <p className="font-bold">ADDITIONAL ADD-ONS</p>

            <ul className="list-disc ml-6">
              <li>
                CHILD SAFETY SEATS – available with a minimum of 24-hours
                advance booking otherwise based on availability. The cost of the
                Child Safety Seat is $15.00 per day. **Rental Agency will NOT
                install child safety seats. This must be performed solely by the
                customer.
              </li>
              <li>
                PORTABLE GPS UNITS – available with 24-hours notice and at an
                additional cost of $10.00 per day.
              </li>
              <li>
                WI-FI HOTSPOT – Some manufactures have a wi-fi hotspot built
                into the vehicle. When available, this can be activated for
                customer use. There is and activation fee of $20, plus data
                charge of $30; $50 total charge. If the vehicle is kept over 28
                days, a charge of $30/month thereafter.
              </li>
            </ul>
          </section>

          {/* Cancellation Policy */}
          <section>
            <p className="font-bold">CANCELLATION POLICY —</p>
            <p>
              There is no cancellation policy. If you booked a car and didn’t
              show up, your $200 deposit is nonrefundable. After the contract is
              done there’s no refund for early returns also.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <p className="font-bold">CONTACT INFORMATION</p>
            <p>
              Email:{" "}
              <a
                href="mailto:eaglecarrental3@gmail.com"
                className="text-blue-600"
              >
                eaglecarrental3@gmail.com
              </a>
            </p>
            <p>
              Phone: <span className="font-bold">(310) 294-6980</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
