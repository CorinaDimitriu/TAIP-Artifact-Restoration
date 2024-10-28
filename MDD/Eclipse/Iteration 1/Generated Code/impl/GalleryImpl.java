/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid.impl;

import com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Painting;

import java.util.Collection;

import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.MinimalEObjectImpl;

import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Gallery</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl#getId <em>Id</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl#getGalleryName <em>Gallery Name</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl#getDescription <em>Description</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl#isIsDefault <em>Is Default</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.GalleryImpl#getPaintings <em>Paintings</em>}</li>
 * </ul>
 *
 * @generated
 */
public class GalleryImpl extends MinimalEObjectImpl.Container implements Gallery {
	/**
	 * The default value of the '{@link #getId() <em>Id</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getId()
	 * @generated
	 * @ordered
	 */
	protected static final String ID_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getId() <em>Id</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getId()
	 * @generated
	 * @ordered
	 */
	protected String id = ID_EDEFAULT;

	/**
	 * The default value of the '{@link #getGalleryName() <em>Gallery Name</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGalleryName()
	 * @generated
	 * @ordered
	 */
	protected static final String GALLERY_NAME_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getGalleryName() <em>Gallery Name</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGalleryName()
	 * @generated
	 * @ordered
	 */
	protected String galleryName = GALLERY_NAME_EDEFAULT;

	/**
	 * The default value of the '{@link #getDescription() <em>Description</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getDescription()
	 * @generated
	 * @ordered
	 */
	protected static final String DESCRIPTION_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getDescription() <em>Description</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getDescription()
	 * @generated
	 * @ordered
	 */
	protected String description = DESCRIPTION_EDEFAULT;

	/**
	 * The default value of the '{@link #isIsDefault() <em>Is Default</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isIsDefault()
	 * @generated
	 * @ordered
	 */
	protected static final boolean IS_DEFAULT_EDEFAULT = false;

	/**
	 * The cached value of the '{@link #isIsDefault() <em>Is Default</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isIsDefault()
	 * @generated
	 * @ordered
	 */
	protected boolean isDefault = IS_DEFAULT_EDEFAULT;

	/**
	 * The cached value of the '{@link #getPaintings() <em>Paintings</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getPaintings()
	 * @generated
	 * @ordered
	 */
	protected EList<Painting> paintings;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected GalleryImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return FillTheVoidPackage.Literals.GALLERY;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getId() {
		return id;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setId(String newId) {
		String oldId = id;
		id = newId;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.GALLERY__ID, oldId, id));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getGalleryName() {
		return galleryName;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setGalleryName(String newGalleryName) {
		String oldGalleryName = galleryName;
		galleryName = newGalleryName;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.GALLERY__GALLERY_NAME,
					oldGalleryName, galleryName));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setDescription(String newDescription) {
		String oldDescription = description;
		description = newDescription;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.GALLERY__DESCRIPTION,
					oldDescription, description));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public boolean isIsDefault() {
		return isDefault;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setIsDefault(boolean newIsDefault) {
		boolean oldIsDefault = isDefault;
		isDefault = newIsDefault;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.GALLERY__IS_DEFAULT, oldIsDefault,
					isDefault));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EList<Painting> getPaintings() {
		if (paintings == null) {
			paintings = new EObjectContainmentEList<Painting>(Painting.class, this,
					FillTheVoidPackage.GALLERY__PAINTINGS);
		}
		return paintings;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case FillTheVoidPackage.GALLERY__PAINTINGS:
			return ((InternalEList<?>) getPaintings()).basicRemove(otherEnd, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
		case FillTheVoidPackage.GALLERY__ID:
			return getId();
		case FillTheVoidPackage.GALLERY__GALLERY_NAME:
			return getGalleryName();
		case FillTheVoidPackage.GALLERY__DESCRIPTION:
			return getDescription();
		case FillTheVoidPackage.GALLERY__IS_DEFAULT:
			return isIsDefault();
		case FillTheVoidPackage.GALLERY__PAINTINGS:
			return getPaintings();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
		case FillTheVoidPackage.GALLERY__ID:
			setId((String) newValue);
			return;
		case FillTheVoidPackage.GALLERY__GALLERY_NAME:
			setGalleryName((String) newValue);
			return;
		case FillTheVoidPackage.GALLERY__DESCRIPTION:
			setDescription((String) newValue);
			return;
		case FillTheVoidPackage.GALLERY__IS_DEFAULT:
			setIsDefault((Boolean) newValue);
			return;
		case FillTheVoidPackage.GALLERY__PAINTINGS:
			getPaintings().clear();
			getPaintings().addAll((Collection<? extends Painting>) newValue);
			return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.GALLERY__ID:
			setId(ID_EDEFAULT);
			return;
		case FillTheVoidPackage.GALLERY__GALLERY_NAME:
			setGalleryName(GALLERY_NAME_EDEFAULT);
			return;
		case FillTheVoidPackage.GALLERY__DESCRIPTION:
			setDescription(DESCRIPTION_EDEFAULT);
			return;
		case FillTheVoidPackage.GALLERY__IS_DEFAULT:
			setIsDefault(IS_DEFAULT_EDEFAULT);
			return;
		case FillTheVoidPackage.GALLERY__PAINTINGS:
			getPaintings().clear();
			return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.GALLERY__ID:
			return ID_EDEFAULT == null ? id != null : !ID_EDEFAULT.equals(id);
		case FillTheVoidPackage.GALLERY__GALLERY_NAME:
			return GALLERY_NAME_EDEFAULT == null ? galleryName != null : !GALLERY_NAME_EDEFAULT.equals(galleryName);
		case FillTheVoidPackage.GALLERY__DESCRIPTION:
			return DESCRIPTION_EDEFAULT == null ? description != null : !DESCRIPTION_EDEFAULT.equals(description);
		case FillTheVoidPackage.GALLERY__IS_DEFAULT:
			return isDefault != IS_DEFAULT_EDEFAULT;
		case FillTheVoidPackage.GALLERY__PAINTINGS:
			return paintings != null && !paintings.isEmpty();
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy())
			return super.toString();

		StringBuilder result = new StringBuilder(super.toString());
		result.append(" (id: ");
		result.append(id);
		result.append(", galleryName: ");
		result.append(galleryName);
		result.append(", description: ");
		result.append(description);
		result.append(", isDefault: ");
		result.append(isDefault);
		result.append(')');
		return result.toString();
	}

} //GalleryImpl
